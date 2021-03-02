document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#add").addEventListener("click", addToBlackList);
});
// document.body.onload = () => {
//   chrome.storage.sync.clear();
// };

const removeSpecialCharAndSplit = (item) => {
  return item
    .replace(/\r?\n|\r/g, "")
    .replace(/[-~.,]/g, "")
    .replace(/ /g, "")
    .split(/[0-9]/);
};
const updateList = (val) => {
  chrome.storage.sync.set({ blackList: val }, () => {
    console.log("added new item" + val);
  });
};

const addToBlackList = () => {
  const value = document.querySelector("#title").value;
  const formattedVal = removeSpecialCharAndSplit(value);

  chrome.storage.sync.get({ blackList: [] }, (result) => {
    const list = result.blackList;
    if (formattedVal[0] != "") {
      if (list.some((item) => item === formattedVal[0]) === false) {
        list.push(formattedVal[0]);
        updateList(list);
      }
    }
  });
};
