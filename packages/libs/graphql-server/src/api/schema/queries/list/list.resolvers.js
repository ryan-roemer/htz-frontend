const list = (_, args, { dataSources, }) => dataSources.PapiAPI.getList(args.input);

const type = new Map([
  [ 'com.polobase.ClickTrackerBannersWrapper', 'clickTracker', ],
  [ 'com.polobase.DfpBannerElement', 'dfp', ],
  [ 'com.tm.TeaserData', 'teaser', ],
]);

export default {
  Query: {
    list,
  },
  List: {
    items({ items, }) {
      return items && items.reduce((results, item) => {
        if (type.get(item.inputTemplate) === 'teaser') {
          results.push(item);
        }
        return results;
      }, []);
    },
    clickTrackers({ items, }) {
      return items && items.reduce((results, item) => {
        if (type.get(item.inputTemplate) === 'clickTracker') {
          results.push(item);
        }
        return results;
      }, []);
    },
    dfp({ items, }) {
      return items && items.reduce((results, item) => {
        if (type.get(item.inputTemplate) === 'dfp') {
          results.push(item);
        }
        return results;
      }, []);
    },
    content({ items, }) {
      return items && items.reduce((results, item) => {
        if (!type.get(item.inputTemplate)) {
          results.push(item);
        }
        return results;
      }, []);
    },
  },
};
