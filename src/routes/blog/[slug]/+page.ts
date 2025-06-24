import { error } from "@sveltejs/kit";
import type { SvelteComponent } from "svelte";
import type { PageLoad } from "./$types";

interface Post {
    default: typeof SvelteComponent;
    metadata: {
        id: number;
        title: string;
        date: string;
        verses: string;
    };
}

export const load: PageLoad = async ({ url, params }) => {
    const posts = import.meta.glob("/src/posts/*.md");

    const match = Object.entries(posts).find(
        ([key]) => key === `/src/posts/${params.slug}.md`,
    );

    if (!match) {
        throw error(404, "Post not found");
    }

    const post = (await match[1]()) as Post;

    const res = await fetch(
        `https://bible-api.com/${post.metadata.verses}?translation=kjv`,
    );
    const data = await res.json();

    post.metadata.verses = data.verses
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((verses: any) => verses.text.replace(/\n/g, ""))
        .join("\n\n");

    return {
        url,
        Content: post.default,
        metadata: post.metadata,
        reference: data.reference as string,
    };
};
