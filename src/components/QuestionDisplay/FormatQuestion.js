const FormatQuestion = (string) => {
  if (!string) {
    return '';
  }

  const txt = document.createElement("textarea");
  txt.innerHTML = string;
  return txt.value;
};

export default FormatQuestion;
