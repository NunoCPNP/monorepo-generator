import { ncp } from "ncp";

export const copy = (source: string, destination: string) => new Promise((result, reject) => {
  ncp(source, destination, err => {
    if (err) {
      reject(err)
    } else {
      result()
    }
  })
})