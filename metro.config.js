const path = require('path');
const getWorkspaces = require('get-yarn-workspaces');
const workspaces = getWorkspaces(__dirname);
const pkg = require("./apps/app/package.json")

const pkgName = pkg.name

module.exports = {
  // projectRoot: path.resolve(__dirname, 'apps/app'),

  watchFolders: [path.resolve(__dirname, 'node_modules'), ...workspaces],

  resolver: {
    blocklist: workspaces.map(
      workspacePath =>
        `/${workspacePath.replace(
          /\//g,
          '[/\\\\]',
        )}[/\\\\]node_modules[/\\\\]react-native[/\\\\].*/`,
    ),

    extraNodeModules: {
      'react-native': path.resolve(
        __dirname,
        `apps/${pkgName}/node_modules/react-native`,
      ),
    },
  },
};