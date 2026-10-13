<script lang="ts">import '@tabler/core/dist/css/tabler.min.css'; import '../app.css'; import '../redesign.css'; let { children } = $props();</script>
<svelte:head>
 <link rel="stylesheet" href="/readability.css"/>
 <link rel="stylesheet" href="/journal-theme.css"/>
</svelte:head>
{@render children()}
