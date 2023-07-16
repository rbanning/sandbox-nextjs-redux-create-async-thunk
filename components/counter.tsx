"use client";

import { useAppSelector, useAppDispatch } from "@/store";
import { increment, decrement } from "@/store/features/counter/counter-slice";

function Counter() {
  const { value, status, error } = useAppSelector((state) => state.counter);
  const dispatch = useAppDispatch();

  return (
    <>
    <div className="flex items-center">
      <button 
        disabled={status === 'working'}
        className="border-2 border-slate-300 rounded py-1 px-3 text-xl disabled:opacity-50" 
        onClick={() => dispatch(decrement())}>-</button>
      <span className="py-1 px-3 rounded text-xl text-teal-700 mx-1">{value}</span>
      <button 
        disabled={status === 'working'}
        className="border-2 border-slate-300 rounded py-1 px-3 text-xl disabled:opacity-50" 
        onClick={() => dispatch(increment())}>+</button>
    </div>
    <div className="flex flex-wrap items-center text-sm">
      <span className="text-slate-300 mx-2">Status: </span>
      {status === 'idle' && (
        <span className="text-slate-800">idle</span>
      )}
      {status === 'working' && (
        <span className="text-sky-600">working...</span>
      )}
      {status === 'error' && (
        <span className="text-rose-800">ERROR</span>
      )}
      {!!error && (
        <span className="text-rose-800 mx-2">{error}</span>
      )}
    </div>
    </>
  )
}

export default Counter;
