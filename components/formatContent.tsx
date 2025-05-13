export const formatContent = (content: string | undefined) => {
  if (typeof content !== "string") return "";
  if (!content) return "";

  // Prepare the content for processing
  const elements = [];
  let lastIndex = 0;

  // Regex to match lines starting with >
  const greentextRegex = /^>.*$/gm;
  let match;

  // Clone the content to avoid mutations
  const contentStr = String(content);

  while ((match = greentextRegex.exec(contentStr)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {contentStr.substring(lastIndex, match.index)}
        </span>
      );
    }

    // Add the greentext
    elements.push(
      <span key={`greentext-${match.index}`} className="text-green-600">
        {match[0]}
      </span>
    );

    lastIndex = match.index + match[0].length;
  }

  // Add any remaining text
  if (lastIndex < contentStr.length) {
    elements.push(
      <span key={`text-${lastIndex}`}>{contentStr.substring(lastIndex)}</span>
    );
  }

  return <div className="whitespace-pre-wrap break-words">{elements}</div>;
};
