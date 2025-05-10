import { Thread, ThreadIndex } from "4chan-ts";


// extend ThreadIndex interface to include replies_arr
declare module "4chan-ts" {
  interface Thread {
    replies_arr: Thread[]
    isReplyInstance : boolean
  }
}

function findReplyLinksInComment(htmlString : string) {
  const links = [];
  // Regex to find <a href="#pPOST_ID" ...> tags
  // It captures the POST_ID.
  const regex = /<a href="#p(\d+)"[^>]*>/g;
  let match;
  while ((match = regex.exec(htmlString)) !== null) {
      links.push({
          id: match[1],       // The captured post ID
          tag: match[0],      // The full matched <a> tag
          index: match.index  // The starting index of the tag in htmlString
      });
  }
  // Ensure links are sorted by their appearance order (though regex.exec usually does this)
  links.sort((a, b) => a.index - b.index);
  return links;
}


export const FormatThreadToNestedComment = async (Threads : ThreadIndex) => {
  // if (!Threads || !Threads.posts || Threads.posts.length === 0) {
  //   console.warn("FormatThreadToNestedComment: Input Threads or Threads.posts is empty or invalid.");
  //   return null;
  // }

  const posts = Threads.posts;
  const op = posts[0];
  const postMap = new Map<number, Thread>(); // For quick lookup of original post objects by their 'no'
  const nestedPostsIds = new Set<number>(); // Track posts that have been nested as replies
  const postRepliesDirectlyToOP = new Map<number, string>(); // Store replies to OP with their content

  // First pass: Initialize each original post with an empty 'replies' array
  // and add it to the map. This 'replies' array will store posts that reply TO this post.
  posts.forEach(post => {
    post.replies_arr = [];
    postMap.set(post.no, post);
  });

  // Second pass: Iterate through each post. If it replies_arr to others,
  // create appropriate reply instances and add them to the parents' 'replies_arr' arrays.
  posts.forEach(currentPost => {
    const originalPostInMap = postMap.get(currentPost.no); // Get the definitive object from the map
    const commentHtml = currentPost.com;

    if (!commentHtml) return; // Skip if no comment content
    const replyLinks = findReplyLinksInComment(commentHtml);

    if (replyLinks.length > 0) {
      // This currentPost is replying to one or more other posts.

      // Check if this post replies to the OP (to save the content)
      replyLinks.forEach((linkInfo, i) => {
        const parentPostId = parseInt(linkInfo.id, 10);
        if (parentPostId === op.no) {
          // Calculate the segment for the OP reply
          const segmentStartIndex = linkInfo.index;
          const segmentEndIndex = (i + 1 < replyLinks.length) ? replyLinks[i+1].index : commentHtml.length;
          const extractedCom = commentHtml.substring(segmentStartIndex, segmentEndIndex).trim();

          // Store this segment as the reply to OP
          postRepliesDirectlyToOP.set(currentPost.no, extractedCom);
        }
      });

      // For each parent it replies_arr to, we create a specific reply instance.
      for (let i = 0; i < replyLinks.length; i++) {
        const linkInfo = replyLinks[i];
        const parentPostId = parseInt(linkInfo.id, 10);
        const parentPostInMap = postMap.get(parentPostId); // The parent post object

        if (parentPostInMap) {
          // Determine the segment of currentPost.com relevant to this specific parent.
          // The segment starts at the current link's index.
          const segmentStartIndex = linkInfo.index;
          // The segment ends at the start of the *next* reply link, or at the end of the comment.
          const segmentEndIndex = (i + 1 < replyLinks.length) ? replyLinks[i+1].index : commentHtml.length;

          const extractedCom = commentHtml.substring(segmentStartIndex, segmentEndIndex).trim();

          // Create a new "reply instance" object.
          // This instance represents currentPost AS A REPLY TO parentPostInMap.
          const replyInstance = {
            ...currentPost, // Copy all properties from the original currentPost
            com: extractedCom, // Override 'com' with the extracted, relevant segment
            // The 'replies_arr' property of this instance should point to the
            // 'replies_arr' array of the *original* post. This means if other posts
            // reply to currentPost (e.g., post D replies_arr to currentPost),
            // they will appear in replyInstance.replies_arr.
            replies_arr: originalPostInMap?.replies_arr || [],
            isReplyInstance: true // Custom flag to identify this as a specialized instance
          };

          // Add this specialized replyInstance to the parent's replies array.
          // Avoid adding duplicate *instances* if logic somehow allows (though unlikely here).
          if (!parentPostInMap.replies_arr.some(r => r.isReplyInstance && r.no === replyInstance.no && r.com === replyInstance.com)) {
            parentPostInMap.replies_arr.push(replyInstance);

            // If it replies to anyone except OP, mark for potential filtering
            if (parentPostId !== op.no) {
              nestedPostsIds.add(currentPost.no);
            }
          }
        }
      }
    }
  });

  // Process the filtered posts
  const filteredPosts = posts.map(post => {
    // If this post replies to someone other than OP but also to OP
    if (nestedPostsIds.has(post.no) && postRepliesDirectlyToOP.has(post.no)) {
      // Create a modified version that only contains the reply to OP
      const modifiedPost = {
        ...post,
        com: postRepliesDirectlyToOP.get(post.no)
      };
      return modifiedPost;
    }
    return post;
  });

  console.log(filteredPosts);
  return filteredPosts;
};
