export function formatQuestion(question, author) {
  const { id, optionOne, optionTwo } = question;
  const { name, avatarURL } = author;

  return {
    name,
    authorId: author.id,
    avatar: avatarURL,
    id,
    optionOne,
    optionTwo,
  };
}
