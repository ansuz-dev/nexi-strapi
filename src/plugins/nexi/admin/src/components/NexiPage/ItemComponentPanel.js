import React, {useCallback, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

import {LoadingIndicatorPage} from "@strapi/helper-plugin";
import {Typography} from "@strapi/design-system/Typography";
import {TabPanel} from "@strapi/design-system/Tabs";
import {Table, Thead, Tbody, Tr, Td, Th} from "@strapi/design-system/Table";

import {useIntl} from "react-intl";
import getTrad from "../../utils/getTrad";
import {getItemComponentStatus, serverRestartWatcher} from "../../utils/api";
import ComponentItem from "./ComponentItem";

const ItemComponentPanel = () => {
  const {formatMessage} = useIntl();
  const [isLoading, setIsLoading] = useState(true);

  const data = useRef({});

  useEffect(() => {
    const load = async () => {
      data.current = await getItemComponentStatus();

      setIsLoading(false);
    };

    load();
  }, []);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    await serverRestartWatcher();
    data.current = await getItemComponentStatus();
    setIsLoading(false);
  }, []);

  return (
    <TabPanel>
      <Table colCount={2} rowCount={0}>
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id: getTrad("NexiPage.tab-panel.column-name"),
                  defaultMessage: "Name",
                })}
              </Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            isLoading
              ? <LoadingIndicatorPage />
              : Object.entries(data.current)?.map(([uid, item]) => (
                <ComponentItem key={uid} item={item} onChange={refresh} />
              ))
          }
        </Tbody>
      </Table>
    </TabPanel>
  );
};

ItemComponentPanel.propTypes = {};

export default ItemComponentPanel;
