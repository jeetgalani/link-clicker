import React, { useState, useEffect } from 'react';

const AutoClickScheduler = () => {
  const [url, setUrl] = useState('');
  const [clickCount, setClickCount] = useState(1);
  const [waitTime, setWaitTime] = useState(5);
  const [isScheduled, setIsScheduled] = useState(false);
  const [intervalTime, setIntervalTime] = useState(5);
  const [runLoop, setRunLoop] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (runLoop && isScheduled) {
      intervalId = setInterval(() => {
        handleRunScript();
      }, intervalTime * 60000);
    }
    return () => clearInterval(intervalId);
  }, [runLoop, isScheduled, intervalTime]);

  const handleRunScript = async () => {
    if (!isScheduled && runLoop) return;

    setLoading(true);
    try {
      const response = await fetch("https://your-render-backend-url.onrender.com/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          clickCount,
          waitTime,
          isScheduled,
          intervalTime,
        }),
      });

      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error running script:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRunLoop(true);
    handleRunScript();
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 shadow-lg rounded-xl border bg-white">
      <h1 className="text-2xl font-semibold mb-4 text-center">Auto Click Scheduler</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">URL to click</label>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Number of clicks</label>
          <input
            type="number"
            value={clickCount}
            onChange={(e) => setClickCount(parseInt(e.target.value))}
            min={1}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Wait time between clicks (seconds)</label>
          <input
            type="number"
            value={waitTime}
            onChange={(e) => setWaitTime(parseInt(e.target.value))}
            min={1}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            id="schedule"
            type="checkbox"
            checked={isScheduled}
            onChange={(e) => setIsScheduled(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="schedule" className="text-sm">Run on scheduled basis</label>
        </div>

        {isScheduled && (
          <div>
            <label className="block text-sm font-medium mb-1">Schedule interval (minutes)</label>
            <input
              type="number"
              value={intervalTime}
              onChange={(e) => setIntervalTime(parseInt(e.target.value))}
              min={1}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Running...' : 'Submit & Run'}
        </button>
      </form>
    </div>
  );
};

export default AutoClickScheduler;
