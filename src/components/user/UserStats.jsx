export default function UserStats({ stats }) {
  return (
    <div className="flex justify-center md:justify-start gap-8">
      <div className="text-center">
        <p className="text-white font-bold text-2xl">{stats.posts}</p>
        <p className="text-neutral-400 text-sm">Photos</p>
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-2xl">{stats.followers}</p>
        <p className="text-neutral-400 text-sm">Followers</p>
      </div>
      <div className="text-center">
        <p className="text-white font-bold text-2xl">{stats.following}</p>
        <p className="text-neutral-400 text-sm">Following</p>
      </div>
    </div>
  );
}