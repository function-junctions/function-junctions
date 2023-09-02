type InputSocketConnection = {
  nodeId: string;
  outputId: string;
};

type InputSocketOptions = {
  type: string;
  connection?: InputSocketConnection;
};

type InputSocket<T> = InputSocketOptions & {
  value: T;
};

type Tree = {
  nodes: Record<
    string,
    {
      outputs: Record<
        string,
        {
          value: string;
        }
      >;
    }
  >;
};

const tree: Tree = {
  nodes: {
    test: {
      outputs: {
        test: {
          value: 'hello!',
        },
      },
    },
    test1: {
      outputs: {
        test: {
          value: 'hello again!',
        },
      },
    },
  },
};

const inputSocketConnection = (
  dispatch: (connection: InputSocketConnection) => void,
) =>
  new Proxy<InputSocketConnection>(
    {
      nodeId: '',
      outputId: '',
    },
    {
      set: (
        connection,
        prop: keyof InputSocketConnection,
        value: InputSocketConnection[keyof InputSocketConnection],
      ) => {
        connection[prop] = value;
        dispatch(connection);

        return true;
      },
    },
  );

const inputSocketDispatch = <T>(
  proxiedValue: { value: T },
  connection: InputSocketConnection,
) => {
  const { nodeId, outputId } = connection;

  const outputValue = tree.nodes[nodeId]?.outputs?.[outputId];

  if (outputValue) proxiedValue.value = outputValue;
};

const createInputSocketValue = <T>(value?: T) =>
  new Proxy<{ value?: T }>(
    { value },
    {
      get: (...args) => {
        Reflect.get(...args);
      },
    },
  );

const createInputConnection = (options: InputSocketOptions) => {
  if (!options.connection) return options;

  const value = createInputSocketValue();

  const connection = inputSocketConnection((dispatch) =>
    inputSocketDispatch(value, dispatch),
  );

  Object.assign(connection, options.connection);

  return {
    type: options.type,
    connection,
    value,
  };
};

const input = createInputConnection({
  type: 'string',
  connection: {
    nodeId: 'test',
    outputId: 'test',
  },
});

console.log(input);

if (input.connection) input.connection.nodeId = 'test1';

console.log(input);

export {};
