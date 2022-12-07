import React from "react";
import PropTypes from "prop-types";
import {Box} from "@strapi/design-system/Box";
import {Typography} from "@strapi/design-system/Typography";
import {useIntl} from "react-intl";

import {Tabs, Tab, TabGroup, TabPanels} from "@strapi/design-system/Tabs";

import getTrad from "../../utils/getTrad";
import SingleTypePanel from "./SingleTypePanel";
import CollectionTypePanel from "./CollectionTypePanel";
import SectionComponentPanel from "./SectionComponentPanel";
import ItemComponentPanel from "./ItemComponentPanel";

const Info = () => {
  const {formatMessage} = useIntl();
  return (
    <Box padding={8}>
      <TabGroup label="label" id="tabs">
        <Tabs>
          <Tab>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad("NexiPage.tab.item-title"),
                defaultMessage: "Item components",
              })}
            </Typography>
          </Tab>
          <Tab>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad("NexiPage.tab.section-title"),
                defaultMessage: "Section components",
              })}
            </Typography>
          </Tab>
          <Tab>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad("NexiPage.tab.collection-type-title"),
                defaultMessage: "Collection Types",
              })}
            </Typography>
          </Tab>
          <Tab>
            <Typography variant="omega">
              {formatMessage({
                id: getTrad("NexiPage.tab.single-type-title"),
                defaultMessage: "Single Types",
              })}
            </Typography>
          </Tab>
        </Tabs>
        <TabPanels>
          <ItemComponentPanel />
          <SectionComponentPanel />
          <CollectionTypePanel />
          <SingleTypePanel />
        </TabPanels>
      </TabGroup>
    </Box>
  );
};

Info.defaultProps = {contentTypes: {}};

Info.propTypes = {};

export default Info;
