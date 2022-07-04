import { Button, Dropdown, Input, Menu, message, Modal, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IAddPlugin, IPlugin } from "../../type/type";
import style from "./style.module.sass";
import * as Api from "../../service/api";
import { LeftOutlined, EllipsisOutlined } from "@ant-design/icons";
import copy from "../../utils/copy";

interface TableData {
  key: number;
  pluginName: string;
  introduce: string;
  instruction: string;
  webUrl: string;
}
const PluginList = () => {
  const { technology, id } = useParams(); // 路由参数
  const { confirm } = Modal;
  const navigate = useNavigate();
  const [pluginList, setpluginList] = useState<Array<IPlugin>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewModal, setIsNewModal] = useState(true);
  const [pluginModal, setPluginModal] = useState<IPlugin>({
    id: 0,
    pluginName: "",
    introduce: "",
    instruction: "",
    webUrl: "",
  });
  const menu = (data: TableData) => (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <Button
              onClick={(
                event: React.MouseEvent<HTMLImageElement, MouseEvent>
              ) => {
                event.stopPropagation();
                let editData: IPlugin = {
                  id: data.key,
                  pluginName: data.pluginName,
                  introduce: data.introduce,
                  instruction: data.instruction,
                  webUrl: data.webUrl,
                };

                setIsModalVisible(true);
                setIsNewModal(false);
                setPluginModal(editData);
              }}
              type="link"
            >
              编辑
            </Button>
          ),
        },
        {
          key: "2",
          label: (
            <Button
              onClick={() => {
                confirm({
                  okText: "确认",
                  cancelText: "取消",
                  content: <div>确认删除？</div>,
                  onOk() {
                    deletePlugin(data.key);
                  },
                  onCancel() {
                    console.log("Cancel");
                  },
                });
              }}
              type="link"
            >
              删除
            </Button>
          ),
        },
      ]}
    />
  );
  const columns: ColumnsType<TableData> = [
    {
      title: "插件名称",
      dataIndex: "pluginName",
      key: "pluginName",
    },
    {
      title: "说明",
      dataIndex: "introduce",
      key: "introduce",
    },
    {
      title: "指令",
      dataIndex: "instruction",
      key: "instruction",
      render: (data: string) => (
        <Button onClick={() => copy(data)} type="link">
          {data}
        </Button>
      ),
    },
    {
      title: "网址",
      dataIndex: "webUrl",
      key: "webUrl",
      render: (data: string) => (
        <a target="_blank" href={data}>
          {data}
        </a>
      ),
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (data: TableData) => (
        <Dropdown overlay={menu(data)}>
          <a onClick={(e) => e.preventDefault()}>
            <EllipsisOutlined className={style.action_icon} />
          </a>
        </Dropdown>
      ),
    },
  ];
  // 获取插件列表
  const getPlugin = async () => {
    if (id !== undefined) {
      const res = await Api.getPluginList(parseInt(id));
      if (res.status === 200) {
        setpluginList(res.data);
      }
    }
  };
  // 添加插件
  const addPlugin = async () => {
    if (id !== undefined) {
      let addPluginData: IAddPlugin = {
        pluginName: pluginModal.pluginName,
        introduce: pluginModal.introduce,
        instruction: pluginModal.instruction,
        webUrl: pluginModal.webUrl,
        parTechnologyId: parseInt(id),
      };
      const res = await Api.addPlugin(addPluginData);
      if (res.status === 200) {
        message.success("添加成功");
        getPlugin();
      }
    }
  };
  // 编辑插件
  const editPlugin = async () => {
    const res = await Api.editPlugin(pluginModal);
    if (res.status === 200) {
      message.success("编辑成功");
      setpluginList(
        pluginList.map((itemT) => {
          if (itemT.id === pluginModal.id) {
            itemT = pluginModal;
          }
          return itemT;
        })
      );
    }
  };
  // 删除插件
  const deletePlugin = async (id: number) => {
    const res = await Api.deletePlugin(id);
    if (res.status === 200) {
      message.success("删除成功");
      setpluginList(pluginList.filter((x) => x.id !== id));
    }
  };
  const handleOk = () => {
    if (isNewModal) {
      addPlugin();
    } else {
      editPlugin();
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    getPlugin();
  }, []);
  return (
    <div className={style.tech_content}>
      <Modal
        title={isNewModal ? "新增" : "编辑"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <div className={style.input_name}>插件名称：</div>
        <Input
          value={pluginModal.pluginName}
          onChange={(e) => {
            let pluginData: IPlugin = { ...pluginModal };
            pluginData.pluginName = e.target.value;
            setPluginModal(pluginData);
          }}
          placeholder="请输入插件名称"
        />
        <div className={style.input_name}>插件说明：</div>
        <Input
          value={pluginModal.introduce}
          onChange={(e) => {
            let pluginData: IPlugin = { ...pluginModal };
            pluginData.introduce = e.target.value;
            setPluginModal(pluginData);
          }}
          placeholder="请输入插件说明："
        />
        <div className={style.input_name}>插件指令：</div>
        <Input
          value={pluginModal.instruction}
          onChange={(e) => {
            let pluginData: IPlugin = { ...pluginModal };
            pluginData.instruction = e.target.value;
            setPluginModal(pluginData);
          }}
          placeholder="请输入插件指令："
        />
        <div className={style.input_name}>插件网址：</div>
        <Input
          value={pluginModal.webUrl}
          onChange={(e) => {
            let pluginData: IPlugin = { ...pluginModal };
            pluginData.webUrl = e.target.value;
            setPluginModal(pluginData);
          }}
          placeholder="请输入插件网址："
        />
      </Modal>
      <div className={style.tech_tool}>
        <div
          onClick={() => {
            navigate("/technology_list");
          }}
          className={style.back}
        >
          <LeftOutlined className={style.back_icon} />
          {technology}
        </div>
        <Button
          onClick={() => {
            setPluginModal({
              id: 0,
              pluginName: "",
              introduce: "",
              instruction: "",
              webUrl: "",
            });
            setIsNewModal(true);
            setIsModalVisible(true);
          }}
        >
          新增
        </Button>
      </div>
      <div className={style.tech_table}>
        <Table
          columns={columns}
          dataSource={pluginList.map((item) => {
            let data: TableData = {
              key: item.id,
              pluginName: item.pluginName,
              introduce: item.introduce,
              instruction: item.instruction,
              webUrl: item.webUrl,
            };
            return data;
          })}
        />
      </div>
    </div>
  );
};

export default PluginList;
