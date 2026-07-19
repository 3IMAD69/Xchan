export const formatContent = (
  content: string | undefined,
  truncate: boolean = false
) => {
  if (typeof content !== "string") return "";
  if (!content) return "";

  // Prepare the content for processing
  const elements = [];
  let lastIndex = 0;

  // Clone the content to avoid mutations
  const contentStr = String(content);

  // If truncation is needed and content is longer than 200 characters
  const processedContent =
    truncate && contentStr.length > 300
      ? contentStr.substring(0, 300) + "..."
      : contentStr;

  // Regex to match lines starting with >
  const greentextRegex = /^>.*$/gm;
  let match;

  while ((match = greentextRegex.exec(processedContent)) !== null) {
    // Add text before the match
    if (match.index > lastIndex) {
      elements.push(
        <span key={`text-${lastIndex}`}>
          {processedContent.substring(lastIndex, match.index)}
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
  if (lastIndex < processedContent.length) {
    elements.push(
      <span key={`text-${lastIndex}`}>
        {processedContent.substring(lastIndex)}
      </span>
    );
  }

  return <div className="whitespace-pre-wrap break-words">{elements}</div>;
};
