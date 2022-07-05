export function formatDate(date: Date, fmt: string) {
  // 获取年份
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1, //匹配到的结果yyyy，替换成后面的内容
      (date.getFullYear() + "").substring(4 - RegExp.$1.length) //(date.getFullYear() + "") 2019 + + "" 表示将数字转换成字符串
      //substr表示截取几位，假如传过来的是两位yy，就将2019截取4-2位成了19
    );
  }

  const dayArr: Array<string> = ["日", "一", "二", "三", "四", "五", "六"];

  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "D+": dayArr[date.getDay()],
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
  } as any;

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + "";
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      );
    }
  }

  return fmt;
}

function padLeftZero(str: string) {
  //小时分钟秒不足两位的话用00补位，然后str.length
  //假如是04：0004 截取两位 04
  //假如是4：004 截取一位：04
  return ("00" + str).substring(str.length);
}
