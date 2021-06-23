// eslint-disable-next-line @typescript-eslint/no-var-requires
const axios = require('axios');

const {
  COMMIT_MESSAGE = '',
  BITBUCKET_BUILD_NUMBER,
  BITBUCKET_BRANCH,
  BITBUCKET_COMMIT,
  BITBUCKET_EXIT_CODE = '0',
  CHANGELOG_REQUEST_ERROR,
  LAST_COMMIT
} = process.env;

console.log(
  JSON.stringify(
    {
      COMMIT_MESSAGE,
      BITBUCKET_BUILD_NUMBER,
      BITBUCKET_BRANCH,
      BITBUCKET_COMMIT,
      BITBUCKET_EXIT_CODE,
      CHANGELOG_REQUEST_ERROR,
      LAST_COMMIT
    },
    null,
    2
  )
);

const commits = COMMIT_MESSAGE.split('-->commit ')
  .filter((e) => !e.includes('!silent') && e.length)
  .filter((e) => !e.toLowerCase().includes('merge branch'))
  .filter((e) => !e.toLowerCase().includes('pull request'))
  .reverse()
  .map((s) => {
    return {
      hash: s.substr(0, s.indexOf(' ')),
      message: s.substr(s.indexOf(' ') + 1)
    };
  });

const noCommits = !commits.length;
if (noCommits) return;

function notifySlackError(webhook) {
  axios.post(webhook, {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `:no_entry: <https://bitbucket.org/startted/podgotovka-frontend-v3/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}|Pipeline #${BITBUCKET_BUILD_NUMBER}> *failed* for \`${BITBUCKET_BRANCH}\``
        }
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `> commit: \`<https://bitbucket.org/startted/podgotovka-frontend-v3/commits/${BITBUCKET_COMMIT}|${BITBUCKET_COMMIT.slice(
            0,
            6
          )}>\``
        }
      }
    ]
  });
}

function notifySlack(webhook) {
  const blocks = [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `${
          BITBUCKET_BRANCH === 'master'
            ? ':white_check_mark:'
            : ':heavy_check_mark:'
        } <https://bitbucket.org/startted/podgotovka-frontend-v3/addon/pipelines/home#!/results/${BITBUCKET_BUILD_NUMBER}|Pipeline #${BITBUCKET_BUILD_NUMBER}> *passed* for \`${BITBUCKET_BRANCH}\``
      }
    },
    ...commits.map((commit, i, arr) => {
      return {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `> \`<https://bitbucket.org/startted/podgotovka-frontend-v3/commits/${
            commit.hash
          }|${commit.hash.slice(0, 6)}>\`  ${
            commit.message.replace(/\n+/g, '\n> ') +
            (arr.length === i + 1 ? '' : '\n')
          }`
        }
      };
    })
  ];

  if (CHANGELOG_REQUEST_ERROR) {
    blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `:warning: Changelog request error. Only the Last commit is displayed.`
      }
    });
  }

  if (BITBUCKET_BRANCH === 'master') {
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'image',
          image_url:
            'https://sun1-90.userapi.com/rYlK9c_4orFhAybO-n8EVpT5_AhpqxB0oKBPaw/0rE8pVS8KIQ.jpg',
          alt_text: 'link'
        },
        {
          type: 'mrkdwn',
          text: '<https://school.podgotovka.ru/|school.podgotovka.ru>'
        },
        {
          type: 'mrkdwn',
          text: '<https://uchitel.podgotovka.ru/|uchitel.podgotovka.ru>'
        }
      ]
    });
  } else if (BITBUCKET_BRANCH === 'dev') {
    blocks.push({
      type: 'context',
      elements: [
        {
          type: 'image',
          image_url:
            'https://sun1-90.userapi.com/rYlK9c_4orFhAybO-n8EVpT5_AhpqxB0oKBPaw/0rE8pVS8KIQ.jpg',
          alt_text: 'link'
        },
        {
          type: 'mrkdwn',
          text: '<https://devschool.podgotovka.ru|devschool.podgotovka.ru>'
        },
        {
          type: 'mrkdwn',
          text: '<https://devuchitel.podgotovka.ru/|devuchitel.podgotovka.ru>'
        }
      ]
    });
  }

  axios.post(webhook, {
    blocks
  });
}

const TEAM_FRONTEND =
  'https://hooks.slack.com/services/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';

const PROJ_PODGOTOVKA =
  'https://hooks.slack.com/services/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';

const webhooks = [TEAM_FRONTEND, PROJ_PODGOTOVKA];

if (BITBUCKET_EXIT_CODE === '0') {
  webhooks.forEach((link) => notifySlack(link));
} else {
  webhooks.forEach((link) => notifySlackError(link));
}
