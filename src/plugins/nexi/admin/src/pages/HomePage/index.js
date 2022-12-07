/*
 *
 * HomePage
 *
 */

import React, {useCallback, useEffect, useRef, useState} from "react";
// import PropTypes from 'prop-types';

import {Box} from "@strapi/design-system/Box";

import {
  LoadingIndicatorPage,
  ContentBox,
} from "@strapi/helper-plugin";
import InformationSquare from "@strapi/icons/InformationSquare";

import {useIntl} from "react-intl";

import Header from "../../components/NexiPage/Header";
import Info from "../../components/NexiPage/Info";

import pluginId from "../../pluginId";
import {getStatus, serverRestartWatcher} from "../../utils/api";
import getTrad from "../../utils/getTrad";

const HomePage = () => {
  const {formatMessage} = useIntl();
  const [isLoading, setIsLoading] = useState(true);

  const contentTypes = useRef({});

  useEffect(() => {
    const load = async () => {
      contentTypes.current = await getStatus();

      setIsLoading(false);
    };

    load();
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    await serverRestartWatcher();
    contentTypes.current = await getStatus();
    setIsLoading(false);
  }, []);

  return (
    <div>
      <Header />

      <Box paddingLeft={8} paddingRigth={8}>
        <ContentBox
          title={formatMessage({
            id: "Information",
            defaultMessage: "Information",
          })}
          subtitle={formatMessage({
            id: getTrad("NexiPage.info.information"),
            defaultMessage:
              "Choose components you need for your site.",
          })}
          icon={<InformationSquare />}
          iconBackground="primary100"
        />
      </Box>

      {
        isLoading
          ? <LoadingIndicatorPage />
          : <Info contentTypes={contentTypes.current} onChange={refresh} />
      }
    </div>
  );
};
export default HomePage;
