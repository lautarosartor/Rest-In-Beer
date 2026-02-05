import { useCallback, useEffect, useState } from "react";

const DEFAULT_STATE = {
  searchValue: "",
  searchedColumn: "",
  pagination: {
    current: 1,
    pageSize: 1,
    showSizeChanger: true,
  },
  sorting: {
    field: "",
    order: "",
  },
};

export const loadFromSession = (key, fallback) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const saveToSession = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const usePersistedFilters = (
  storageKey,
  defaultState = DEFAULT_STATE
) => {
  const [filters, setFilters] = useState(() =>
    loadFromSession(storageKey, defaultState)
  );

  // persistencia
  useEffect(() => {
    saveToSession(storageKey, filters);
  }, [storageKey, filters]);

  // Table change
  const onTableChange = useCallback((pagination, _, sorting) => {
    setFilters(prev => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        ...pagination,
      },
      sorting,
    }));
  }, []);

  // Search
  const onSearch = useCallback((value, column) => {
    setFilters(prev => ({
      ...prev,
      searchValue: value,
      searchedColumn: column,
      pagination: {
        ...prev.pagination,
        current: 1,
      },
    }));
  }, []);

  // Reset total
  const reset = useCallback(() => {
    setFilters(defaultState);
  }, [defaultState]);

  return {
    filters,
    setFilters, // opcional, por si necesitás algo custom
    onTableChange,
    onSearch,
    reset,
  };
};

export default usePersistedFilters;
