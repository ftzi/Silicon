type BenchmarkRecord = {
  start: number
  end?: number
  delta?: number
}

export const benchmarkData: Record<
  string,
  { records: Array<BenchmarkRecord>; average: number }
> = {}
const benchmarkLength = 100

export const benchmark = (identifier: string, type: "start" | "end") => {
  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  const benchmark = (benchmarkData[identifier] ??= { records: [], average: 0 })
  const records = benchmark.records

  if (type === "start") {
    if (records.length === benchmarkLength - 1) console.log(benchmark.average)
    records.push({
      start: performance.now(),
    })
    if (records.length > benchmarkLength) records.shift()

    return
  }

  const lastRecord = records.at(-1)

  if (!lastRecord) throw new Error("end without start")

  lastRecord.end = performance.now()
  lastRecord.delta = lastRecord.end - lastRecord.start
  benchmark.average =
    records.reduce((sum, record) => sum + (record.delta ?? 0), 0) /
    records.length
}
