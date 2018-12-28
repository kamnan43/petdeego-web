export function swapItemUp(index, list) {
  if (index > 0) {
    let upItem = list[index];
    let downItem = list[index - 1];
    list[index] = downItem;
    list[index - 1] = upItem;
  }
  return list;
}

export function swapItemDown(index, list) {
  if (index + 1 < list.length) {
    let upItem = list[index];
    let downItem = list[index + 1];

    list[index] = downItem;
    list[index + 1] = upItem;
  }

  return list;
}
