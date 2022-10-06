import { Readable } from 'stream';
import csv from "csv-parser"


interface FileParserInterface<T> {
	parseFileStream(fileStream: Readable): Promise<T[]>;
  }

class FileParser<T> implements FileParserInterface<T> {
  public parseFileStream(fileStream: Readable): Promise<T[]> {
    const parsedData: T[] = [];

    return new Promise((resolve, reject) => {
      fileStream
        .pipe(csv())
        .on('error', () => reject('Error while parsing the stream'))
        .on('data', (item) => parsedData.push(item as T))
        .on('end', () => resolve(parsedData));
    });
  }
}

export default FileParser