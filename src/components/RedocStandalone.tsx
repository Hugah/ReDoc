import * as PropTypes from 'prop-types';
import * as React from 'react';

import { RedocNormalizedOptions, RedocRawOptions } from '../services/RedocNormalizedOptions';
import { ErrorBoundary } from './ErrorBoundary';
import { Loading } from './Loading/Loading';
import { Redoc } from './Redoc/Redoc';
import { StoreProvider } from './StoreProvider';

export interface RedocStandaloneProps {
  spec?: object;
  specUrl?: string;
  options?: RedocRawOptions;
  onLoaded?: (e?: Error) => any;
}

export class RedocStandalone extends React.PureComponent<RedocStandaloneProps> {
  static propTypes = {
    spec: (props, _, componentName) => {
      if (!props.spec && !props.specUrl) {
        return new Error(
          `One of props 'spec' or 'specUrl' was not specified in '${componentName}'.`,
        );
      }
      return null;
    },

    specUrl: (props, _, componentName) => {
      if (!props.spec && !props.specUrl) {
        return new Error(
          `One of props 'spec' or 'specUrl' was not specified in '${componentName}'.`,
        );
      }
      return null;
    },
    options: PropTypes.object,
  };

  render() {
    const { spec, specUrl, options = {}, onLoaded } = this.props;
    const hideLoading = options.hideLoading !== undefined;

    const normalizedOpts = new RedocNormalizedOptions(options);

    return (
      <ErrorBoundary>
        <StoreProvider spec={spec} specUrl={specUrl} options={options} onLoaded={onLoaded}>
          {({ loading, store }) =>
            !loading ? (
              <Redoc store={store!} />
            ) : hideLoading ? null : (
              <Loading color={normalizedOpts.theme.colors.primary.main} />
            )
          }
        </StoreProvider>
      </ErrorBoundary>
    );
  }
}
