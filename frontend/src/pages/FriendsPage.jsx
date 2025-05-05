import { useEffect, useState } from "react";
import {
  getUserFriends,
  getRecommendedUsers,
  getOutgoingFriendReqs,
  sendFriendRequest,
} from "../redux/operation/authOperaton";
import { Link } from "react-router-dom";
import { CheckCircleIcon, MapPinIcon, UserPlusIcon, UsersIcon } from "lucide-react";
import { capitialize } from "../util/capitialize.js";
import FriendCard, { getLanguageFlag } from "../component/FriendCard";
import NoFriendsFound from "../component/NoFriendsFound";

const FriendsPage = () => {
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());
  const [friends, setFriends] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [outgoingFriendReqs, setOutgoingFriendReqs] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingFriends, setLoadingFriends] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingFriends(true);
      setLoadingUsers(true);
      const [friends, recommendedUsers, outgoingFriendReqs] = await Promise.all([
        getUserFriends(),
        getRecommendedUsers(),
        getOutgoingFriendReqs()
      ]);
      setFriends(friends.data.friends);
      setRecommendedUsers(recommendedUsers.data);
      setOutgoingFriendReqs(outgoingFriendReqs.data);

      setLoadingFriends(false);
      setLoadingUsers(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const outgoingIds = new Set();
    if (outgoingFriendReqs && outgoingFriendReqs.length > 0) {
      outgoingFriendReqs.forEach((req) => {
        outgoingIds.add(req.receiver._id);
      });
      setOutgoingRequestsIds(outgoingIds);
    }
  }, [outgoingFriendReqs]);

  const handleSendFriendRequest = async (userId) => {
    setIsPending(true);
    await sendFriendRequest(userId);
    setIsPending(false);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Your Friends</h2>
          <Link to="/notifications" className="btn btn-outline btn-sm">
            <UsersIcon className="mr-2 size-4" />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {friends.map((friend) => (
              <FriendCard key={friend._id} friend={friend} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default FriendsPage;