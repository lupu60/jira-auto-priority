import ForgeUI, {
  render,
  useProductContext,
  CustomField,
  CustomFieldEdit,
  Text,
  Select,
  Option,
  StatusLozenge,
  Fragment,
} from "@forge/ui";

const calculatePriority = (severity, probability) => {
  if (severity === 0) {
    return 0;
  }
  if (severity === 1 && probability === 1) {
    return 1;
  }
  if (severity === 1 && probability === 2) {
    return 2;
  }
  if (severity === 2 && probability === 1) {
    return 3;
  }
  if (severity === 2 && probability === 2) {
    return 4;
  }
  if (severity === 1 && probability === 3) {
    return 5;
  }
  if (severity === 3 && probability === 1) {
    return 6;
  }
  if (severity === 2 && probability === 3) {
    return 7;
  }
  if (severity === 3 && probability === 2) {
    return 8;
  }
  if (severity === 3 && probability === 3) {
    return 9;
  }
  return 10;
};

const View = () => {
  const getLozengeApperance = (priority) => {
    if (priority < 3) {
      return "removed";
    }
    if (priority < 7) {
      return "inprogress";
    }
    return "success";
  };

  const {
    extensionContext: { fieldValue },
  } = useProductContext();

  return (
    <CustomField>
      <Text>
        <StatusLozenge
          text={fieldValue || 10}
          appearance={getLozengeApperance(fieldValue || 10)}
        />
      </Text>
    </CustomField>
  );
};

const Edit = () => {
  let priority = 10;
  const onSubmit = (formValue) => {
    const priority = calculatePriority(
      Number(formValue.severity),
      Number(formValue.probability)
    );
    return priority;
  };

  return (
    <CustomFieldEdit onSubmit={onSubmit} header="🚨 Priority 🚨" width="medium">
      <Fragment>
        <Select label="Severity" name="severity" isRequired>
          <Option label="Production blockers" value="0" />
          <Option
            label="Blocker issue that prevents use of the feature / testing"
            value="1"
          />
          <Option
            label="Medium issue that severely hinders the use of the feature"
            value="2"
          />
          <Option label="Minor issue (visual or not hindering)" value="3" />
        </Select>

        <Select label="Probability" name="probability" isRequired>
          <Option label="Every user will encounter this issue" value="1" />
          <Option label="Many users will encounter this issue" value="2" />
          <Option label="Few users will encounter this issue" value="3" />
        </Select>
      </Fragment>
    </CustomFieldEdit>
  );
};

export const renderFieldView = render(<View />);
export const renderFieldEdit = render(<Edit />);
