export default function HealthPage() {
  return (
    <div className="min-h-screen bg-green-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">✅ Health Check</h1>
        <p className="text-xl">Server is running!</p>
        <p className="mt-4 text-green-200">Timestamp: {new Date().toISOString()}</p>
      </div>
    </div>
  )
} 