import Link from '@material-ui/core/Link';

function Secondary({ id, receiver, compoundMessage, getMentionName }) {
  return (
    <>
      {receiver ? `@${getMentionName(receiver)}: ` : ''}
      {compoundMessage.map(({ type, value }, index) =>
        type === 'text' ? (
          value
        ) : (
          <Link
            key={`${id}-${index}`}
            href={value}
            color='primary'
            rel='noreferrer'
            target='_blank'
          >
            {value}
          </Link>
        )
      )}
    </>
  );
}

export default Secondary;
