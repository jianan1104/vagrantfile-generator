import { useState, useEffect, useRef } from "react";

const VAGRANT_CLOUD_API = "https://app.vagrantup.com/api/v2/search";

export function useVagrantCloudSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    debounceRef.current = setTimeout(async () => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch(
          `${VAGRANT_CLOUD_API}?q=${encodeURIComponent(query.trim())}&limit=12`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Failed to fetch boxes");
        const data = await res.json();
        const boxes = (data.boxes || []).map((box) => ({
          id: box.tag,
          value: box.tag,
          name: box.name,
          tag: box.tag,
          description: box.short_description || box.description_short || "",
          downloads: box.downloads,
          provider: box.current_version?.providers?.[0]?.name || "",
          version: box.current_version?.version || "",
        }));
        setResults(boxes);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("Search failed. Try again.");
          setResults([]);
        }
      } finally {
        setLoading(false);
      }
    }, 350);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [query]);

  return { query, setQuery, results, loading, error };
}
