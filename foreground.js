const parent = document.querySelectorAll("div.post-row");

chrome.storage.sync.get({ blackList: [] }, (result) => {
  localStorage.setItem("blackList", JSON.stringify(result.blackList));
});

const removeSpecialCharAndSplit = (item) => {
  return item
    .replace(/\r?\n|\r/g, "")
    .replace(/[-~.,]/g, "")
    .replace(/ /g, "")
    .split(/[0-9]/);
};

const checkBlackList = (item) => {
  const splitItem = removeSpecialCharAndSplit(item);
  const list = JSON.parse(localStorage.getItem("blackList"));
  return list.some((x) => x === splitItem[0]);
};

parent.forEach((element) => {
  const child =
    element.children[0].children[2].children[0].children[0].children[0].text;
  if (checkBlackList(child)) {
    element.outerHTML = "";
  }
});
