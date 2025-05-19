function VidNotSupported({
  ext,
  tim,
  boardId,
}: {
  ext: string;
  tim: number;
  boardId: string;
}) {
  return (
    <div className="mt-2 rounded-md overflow-hidden">
      <div className="p-4 text-center rounded-md">
        <div className="flex items-center justify-center gap-2 text-yellow-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="23 7 16 12 23 17 23 7"></polygon>
            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
          </svg>
          <span>Video format ({ext}) not supported YET!</span>
        </div>
        <div className="mt-2 text-gray-400 text-sm">
          View here :{" "}
          <a
            href={`https://i.4cdn.org/${boardId}/${tim}${ext}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Click here
          </a>
        </div>
      </div>
    </div>
  );
}

export default VidNotSupported;
