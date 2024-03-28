export default function getRecorderWorker(workerBasePath?: string): Worker {
    return new Worker((workerBasePath ? workerBasePath : "") + "RecorderWorker.js");
};
