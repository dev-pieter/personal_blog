export function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
}

export const calculateReadTime = (markdown) => {
  const chars = markdown.length;

  return Math.floor(chars / 200 / 6);
};

export function extractMetaData(text) {
  const metaData = {};

  const metaRegExp = RegExp(/^---[\r\n](((?!---).|[\r\n])*)[\r\n]---$/m);
  // get metadata
  const rawMetaData = metaRegExp.exec(text);

  let keyValues;

  if (rawMetaData) {
    // rawMeta[1] are the stuff between "---"
    keyValues = rawMetaData[1].split("\n");

    // which returns a list of key values: ["key1: value", "key2: value"]
    keyValues.forEach((keyValue) => {
      // split each keyValue to keys and values
      const [key, value] = keyValue.split(":");
      metaData[key] = value.trim();
    });
  }
  return [rawMetaData, metaData];
}

export const hasKey = (obj, key) => {
  let decider = false;

  if (!obj || typeof obj !== "object") return decider;

  Object.keys(obj).forEach((item) => {
    decider = item === key;
  });

  return decider;
};
