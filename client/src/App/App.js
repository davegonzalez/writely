import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import './App.css';

const ArticleQuery = gql`
  {
    articles {
      title
      body
    }
  }
`;

const App = () => {
  return (
    <Query query={ArticleQuery}>
      {
        ({ loading, error, data }) => {
          if (loading) return 'Loading';
          if (error) return 'error';

          return data.articles.map(article => {
            return (
              <div>
                <div>{article.title}</div>
                <div>{article.body}</div>
              </div>
            );
          });
        }
      }
    </Query>
  );
};

export default App;
