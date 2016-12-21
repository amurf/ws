export default equalTo => function (value) {
  if (value === null || value === undefined || value === '') {
    return true
  }

  let [page, question] = equalTo.split('.');
  const compareTo = this.survey[page][question].value

  return value === compareTo
}
