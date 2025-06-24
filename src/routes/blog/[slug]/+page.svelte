<script lang="ts">
    import { idToString } from "$lib/utils";

    let { data } = $props();
    let {
        url,
        Content,
        metadata: { id, title, date, verses },
        reference,
    } = data;
</script>

<div class="flex">
    <div class="mx-auto w-4xl">
        <h1 class="mt-12 mb-4 text-5xl font-bold">{title}</h1>
        <p class="mb-8">
            Point-Free
            <a class="link link-primary" href={url.toString()}>
                {idToString(id)}
            </a>
            | {new Date(date).toDateString()}
        </p>

        <article class="prose">
            <!-- svelte-ignore svelte_component_deprecated -->
            <svelte:component this={Content} />
            <blockquote>
                {#each verses.split("\n\n") as verse (verse)}
                    <p>{verse}</p>
                {/each}
                <ul>
                    <li>{reference}</li>
                </ul>
            </blockquote>
        </article>
    </div>
</div>
