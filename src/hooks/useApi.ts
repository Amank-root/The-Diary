import { useState, useEffect, useCallback } from 'react';

interface UseApiOptions {
  onSuccess?: (data: unknown) => void;
  onError?: (error: Error) => void;
  immediate?: boolean;
}

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T = unknown>(
  url: string, 
  options: RequestInit & UseApiOptions = {}
) {
  const { onSuccess, onError, immediate = true, ...fetchOptions } = options;
  
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        ...fetchOptions,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setState({ data, loading: false, error: null });
      onSuccess?.(data);
      
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      onError?.(error instanceof Error ? error : new Error(errorMessage));
      throw error;
    }
  }, [url, fetchOptions, onSuccess, onError]);

  const mutate = useCallback(async (newData?: T) => {
    if (newData) {
      setState(prev => ({ ...prev, data: newData }));
    } else {
      return fetchData();
    }
  }, [fetchData]);

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null });
  }, []);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    ...state,
    refetch: fetchData,
    mutate,
    reset,
  };
}

export function usePost<TData = unknown, TResponse = unknown>(url: string) {
  const [state, setState] = useState<{
    loading: boolean;
    error: string | null;
  }>({
    loading: false,
    error: null,
  });

  const post = useCallback(async (data: TData): Promise<TResponse> => {
    setState({ loading: true, error: null });
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: response.statusText }));
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      const responseData = await response.json();
      setState({ loading: false, error: null });
      
      return responseData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setState({ loading: false, error: errorMessage });
      throw error;
    }
  }, [url]);

  return {
    ...state,
    post,
  };
}