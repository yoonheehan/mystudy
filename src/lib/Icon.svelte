<script lang="ts">
  let { name = 'book', size = 20, stroke = 1.7 }: { name?: string; size?: number; stroke?: number } = $props();
  const paths: Record<string,string> = {
    home:'M3 10l9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z',
    code:'M8 7l-5 5 5 5m8-10 5 5-5 5M14 4l-4 16',
    server:'M4 3h16v7H4zM4 14h16v7H4zM7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6',
    arrow:'M5 12h14m-6-6 6 6-6 6',
    up:'M6 18L18 6M6 6h12v12',
    book:'M12 6c-4-3-8-2-9-1v15c4-2 7-1 9 1m0-15c4-3 8-2 9-1v15c-4-2-7-1-9 1z',
    clock:'M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
    check:'M5 12l4 4 10-10',
    bookmark:'M6 3h12v18l-6-4-6 4z',
    layers:'M12 3 2 8l10 5 10-5zM2 12l10 5 10-5M2 16l10 5 10-5',
    search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    menu:'M4 6h16M4 12h16M4 18h16',
    close:'M6 6l12 12M6 18 18 6',
    network:'M8 3h8v5H8zM2 17h8v5H2zM14 17h8v5h-8zM12 8v5M6 17v-4h12v4',
    terminal:'M5 7l4 4-4 4M12 15h7M3 3h18v18H3z',
    circle:'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
    info:'M12 11v6M12 7h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
    grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z'
  };
</script>
<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={stroke} stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d={paths[name] || paths.book}/></svg>
