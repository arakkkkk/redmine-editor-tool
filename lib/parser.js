const text2obj = (text) => {
  const lines = text.split("\n");
  const headRegExp = new RegExp("h(\\d+)\\. .+");
  const paragRegExp = new RegExp("p\\(\\. .+");
  let res = [];
  let line_count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(headRegExp)) {
      res.push({
        id: i + 1,
        head: null,
        text: lines[i],
        type: "header",
        level: Number(lines[i].match(headRegExp)[1]),
        line_count: line_count,
      });
    }
    if (lines[i].match(paragRegExp)) {
      res.push({
        id: i + 1,
        head: null,
        text: lines[i],
        type: "paragraph",
        line_count: line_count,
      });
    } else {
      res.push({
        id: i + 1,
        head: null,
        text: lines[i],
        type: "text",
        line_count: line_count,
      });
    }
    line_count += lines[i].length;
    line_count += 1;
  }
  return res;
};

const parseTextile = (lines, level, head_id, res = [], watched = []) => {
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    if (watched.includes(line.id)) {
      continue;
    }
    if (line.type == "header") {
      if (line.level == level) {
        watched.push(line.id);
        line.head = head_id;
        res.push(line);
        parseTextile(lines, level + 1, line.id, res, watched);
      } else if (line.level < level) {
        return;
      }
    } else if (line.type == "paragraph") {
      watched.push(line.id);
      line.head = head_id;
      res.push(line);
    }
  }
};
