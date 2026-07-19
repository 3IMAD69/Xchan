import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { setResponseHeaders } from "@tanstack/react-start/server";
import { htmlToText } from "html-to-text";
import { chan } from "./4chan-client";
import { FormatThreadToNestedComment } from "./4chan-utils";

const HTML_TO_TEXT_OPTIONS = {
  wordwrap: false as const,
  preserveNewlines: true,
};

// Boards change rarely — safe to cache publicly for an hour.
export const getBoards = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await chan.getBoards();

  if (error || !data) {
    throw new Error(error?.message ?? "Error fetching boards");
  }

  data.boards.forEach((board) => {
    board.meta_description = htmlToText(
      board.meta_description,
      HTML_TO_TEXT_OPTIONS
    );
  });

  setResponseHeaders(
    new Headers({ "Cache-Control": "public, max-age=3600" })
  );

  return data.boards;
});

export const getCatalog = createServerFn({ method: "GET" })
  .validator((input: { board: string }) => input)
  .handler(async ({ data: { board } }) => {
    const { data: threads, error } = await chan.getCatalog(board);

    if (error || !threads || !Array.isArray(threads)) {
      throw notFound();
    }

    // html to text for threads
    threads.forEach((thread) => {
      if (thread && thread.threads && Array.isArray(thread.threads)) {
        thread.threads.forEach((th) => {
          if (th.com) {
            th.com = htmlToText(th.com, HTML_TO_TEXT_OPTIONS);
          }
          if (th.sub) {
            th.sub = htmlToText(th.sub, HTML_TO_TEXT_OPTIONS);
          }
        });
      }
    });

    setResponseHeaders(
      new Headers({ "Cache-Control": "public, max-age=60" })
    );

    return threads;
  });

export const getThread = createServerFn({ method: "GET" })
  .validator((input: { board: string; id: number }) => input)
  .handler(async ({ data: { board, id } }) => {
    const { data, error } = await chan.getThread(board, id);
    // sleep 10s
    await new Promise((resolve) => setTimeout(resolve, 10000));
    if (error || !data || !data.posts[0]) {
      throw notFound();
    }

    const posts = await FormatThreadToNestedComment(data);

    const op = posts[0];
    if (op.com) {
      op.com = htmlToText(op.com, HTML_TO_TEXT_OPTIONS);
    }

    // Metadata used by the route's head() (title, description, og:image)
    const rawCom = data.posts[0].com;
    const description = rawCom
      ? htmlToText(rawCom, { wordwrap: false, preserveNewlines: false }).slice(
          0,
          200
        ) + (rawCom.length > 200 ? "..." : "")
      : "";

    const opData = data.posts[0];
    const title = opData.semantic_url
      ? `${opData.semantic_url.replaceAll("-", " ")} - /${board}/ - Xchan`
      : `Thread ${id} on /${board}/`;

    const imageUrl =
      opData.filename && opData.ext
        ? `https://i.4cdn.org/${board}/${opData.tim}${opData.ext}`
        : null;

    return {
      posts,
      op,
      meta: {
        title,
        description: description || `Thread on /${board}/`,
        imageUrl,
        imageWidth: opData.w || 800,
        imageHeight: opData.h || 600,
        imageAlt: opData.filename || "Thread image",
      },
    };
  });
