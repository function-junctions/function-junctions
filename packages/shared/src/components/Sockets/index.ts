type InputSocketConnection = {
  nodeId: string;
  outputId: string;
};

type InputSocketOptions = {
  type: string;
  connection?: InputSocketConnection;
};

type OutputSocketOptions<T> = {
  type: string;
  value: T;
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
          type: string;
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
          type: 'string',
          value: 'hello!',
        },
      },
    },
    test1: {
      outputs: {
        test: {
          type: 'string',
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
  proxiedValue: { value?: T },
  type: string,
  connection: InputSocketConnection,
) => {
  const { nodeId, outputId } = connection;

  const outputValue = tree.nodes[nodeId]?.outputs?.[outputId];

  if (outputValue) {
    if (outputValue.type === type) {
      proxiedValue.value = outputValue;
      return;
    }
    throw new Error('Types do not match!');
  }
};

const createSocketValue = <T>(value?: T) =>
  new Proxy<{ value?: T }>(
    { value },
    {
      get: (...args) => {
        Reflect.get(...args);
      },
    },
  );

const createInput = (options: InputSocketOptions) => {
  if (!options.connection) return options;

  const value = createSocketValue();

  const connection = inputSocketConnection((dispatch) =>
    inputSocketDispatch(value, options.type, dispatch),
  );

  Object.assign(connection, options.connection);

  return {
    type: options.type,
    connection,
    value,
  };
};

const createOutput = <T>(options: OutputSocketOptions<T>) => {
  const value = createSocketValue(options.value);

  return {
    value,
    type: options.type,
  };
};

const input = createInput({
  type: 'string',
  connection: {
    nodeId: 'test',
    outputId: 'test',
  },
});

const output = createOutput({
  type: 'string',
  value: 'herro!',
});

console.log(input);

if (input.connection) input.connection.nodeId = 'test1';

console.log(input);

export {};
