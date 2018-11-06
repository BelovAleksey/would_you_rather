export function formatQuestion(question, author) {
  const { id, optionOne } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    avatar: avatarURL,
    optionOne,
  };
}
