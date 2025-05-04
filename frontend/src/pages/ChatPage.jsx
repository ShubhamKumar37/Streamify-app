import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { toastHandler } from '../util/toastHandler.js';
import { VideoIcon } from "lucide-react";
import api from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import {
  Chat, Channel, ChannelList, Window, ChannelHeader, MessageList, MessageInput, Thread, useCreateChatClient } from "stream-chat-react";
import { StreamChat } from "stream-chat";
import "stream-chat-react/dist/css/v2/index.css";
import ChatLoader from '../component/ChatLoader.jsx';
const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const { id: friendId } = useParams()
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chatToken, setChatToken] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const getStreamToken = async () => {
    const response = await toastHandler(api.get("/chat/token"), 'Loading stream token...', 'Stream token loaded successfully', 'Failed to load stream token');
    return response.data;
  }

  const handleVideoCall = async() => {
    const callUrl = `${window.location.origin}/call/${channel.id}`;
    channel.sendMessage({
      text: `Join this for a video call: ${callUrl}`
    });

    toast.success("Video call link sent to the user");
  }

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getStreamToken();
        setChatToken(token.data);
        console.log("This is the token = ", token);
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const chatInit = async () => {
      if (!chatToken || !user) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);
        await client.connectUser({
          id: user._id,
          name: user.name,
          image: user.profileImage,
        }, chatToken);

        const channelId = [user._id, friendId].sort().join("-");
        const currChannel = client.channel("messaging", channelId, {
          members: [user._id, friendId],
        });
        await currChannel.watch();

        setChannel(currChannel);
        setChatClient(client);
        toast.success("Chat client created successfully");

      } catch (err) {
        console.error("Error creating chat client:", err);
        toast.error("Error creating chat client");
      }
      finally {
        setLoading(false);
      }
    }

    chatInit();

  }, [chatToken, user, friendId]);

  if(loading || !chatClient || !channel) return <ChatLoader />;

  console.log("This is the chatToken = ", chatToken);
  return (
    <div className='h-[90vh] flex flex-col'>
      <Chat client={chatClient} theme="str-chat__theme-dark">
        <Channel channel={channel}>
          <div className='w-full relative'>
            <CallButton handleVideoCall={handleVideoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
            <Thread />
          </div>
        </Channel>

      </Chat>
    </div>
  )
}


const CallButton = ({ handleVideoCall }) => {
  return (
    <div className="p-3 border-b flex items-center justify-end  mx-auto w-full absolute top-0">
      <button onClick={handleVideoCall} className="btn btn-success btn-sm text-white">
        <VideoIcon className="size-6" />
      </button>
    </div>
  );
}

export default ChatPage
