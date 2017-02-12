import * as fs from "fs";

import { FileParser } from "./parser/parser";
import { traverse } from "./traverse/traverse";

const parser = new FileParser();

const paths = [
  "../test-data/smoke.robot",
  "../test-data/resources/common_resources.robot",
  "../test-data/resources/production.robot",
  "../test-data/resources/smoke_resources.robot"
];

const fileTreeMapper = new Map();

paths.forEach(filePath => {
  const fileData = fs.readFileSync(filePath, "utf-8");
  const parsedFile = parser.parseFile(fileData);

  traverse(null, parsedFile, {
    enter: (node, parent) => console.log("Enter", node.type),
    leave: (node, parent) => console.log("Leave", node.type),
  });

  fileTreeMapper.set(filePath, parsedFile);
});