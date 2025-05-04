import React from 'react'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  CallControls,
  SpeakerLayout,
  StreamTheme,
  CallingState,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import ChatLoader from '../component/ChatLoader';
import { toastHandler } from '../util/toastHandler';
import api from '../lib/axios';
import "@stream-io/video-react-sdk/dist/css/styles.css";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const CallPage = () => {
  const { callId } = useParams();
  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [callToken, setCallToken] = useState(null);
  const { user } = useSelector((state) => state.user);

  const getStreamToken = async () => {
    const response = await toastHandler(api.get("/chat/token"), 'Loading stream token...', 'Stream token loaded successfully', 'Failed to load stream token');
    return response.data;
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getStreamToken();
        setCallToken(token.data);
        console.log("This is the token = ", token);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const callInit = async () => {
      if (!callToken || !user || !callId) return;

      try {
        const callClient = {
          id: user._id,
          name: user.name,
          image: user.profileImage,
        }

        const videoClient = new StreamVideoClient({
          apiKey: STREAM_API_KEY,
          user: callClient,
          token: callToken,
        });

        const callInstance = videoClient.call("default", callId);
        await callInstance.join({ create: true });

        console.log("This is the callInstance = ", callInstance);
        setCall(callInstance);
        setClient(videoClient);
        toast.success("Call initialized successfully");
      } catch (err) {
        console.error("Error initializing call:", err);
        toast.error("Error initializing call");
      }
      finally {
        setIsConnecting(false);
      }
    };
    callInit();
  }, [callToken, user, callId]);

  if (isConnecting) return <ChatLoader />;

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="relative">
        {client && call ? (
          <StreamVideo client={client}>
            <StreamCall call={call}>
              <CallUI />
            </StreamCall>
          </StreamVideo>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p>Could not initialize call. Please refresh or try again later.</p>
          </div>
        )}
      </div>
    </div>
  )
}

const CallUI = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  const navigate = useNavigate();

  if (callingState === CallingState.LEFT) return navigate("/");

  return (
    <StreamTheme>
      <div className='flex flex-col items-center justify-center h-full'>
        <SpeakerLayout />
        <CallControls />
      </div>
    </StreamTheme>
  )
}

export default CallPage
