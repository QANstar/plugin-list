import { Button, Input, message, Modal, Popconfirm } from "antd";
import Table, { ColumnsType } from "antd/lib/table";
import style from "./style.module.sass";
import * as Api from "../../service/api";
import React, { useEffect, useState } from "react";
import { IAddTechnology, ITechnology } from "../../type/type";
import Item from "antd/lib/list/Item";
import { useNavigate } from "react-router-dom";
interface TableData {
  key: number;
  technologyName: string;
}

function TechnologyList() {
  const navigate = useNavigate();
  const [technologyList, setTechnologyList] = useState<Array<ITechnology>>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewModal, setIsNewModal] = useState(true);
  const [inputTech, setInputTech] = useState<ITechnology>({
    id: 0,
    technologyName: "",
  });
  const columns: ColumnsType<TableData> = [
    {
      title: "技术名称",
      dataIndex: "technologyName",
      key: "technologyName",
      align: "center",
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      render: (data: TableData) => (
        <div className={style.action_btn}>
          <Button
            onClick={(
              event: React.MouseEvent<HTMLImageElement, MouseEvent>
            ) => {
              event.stopPropagation();
              let editData: ITechnology = {
                id: data.key,
                technologyName: data.technologyName,
              };

              setIsModalVisible(true);
              setIsNewModal(false);
              setInputTech(editData);
            }}
            className="btn_warning"
          >
            编辑
          </Button>
          <Button onClick={(event) => deleteBtn(event, data.key)} danger>
            删除
          </Button>
        </div>
      ),
    },
  ];
  // 获取数据
  const getTechnologyList = async () => {
    const res = await Api.getTechnologyList();
    if (res.status === 200) {
      setTechnologyList(res.data);
    }
  };
  // 添加数据
  const addTechnology = async () => {
    let data: IAddTechnology = {
      technologyName: inputTech.technologyName,
    };
    const res = await Api.addTechnology(data);
    if (res.status === 200) {
      message.success("新增成功");
      getTechnologyList();
    }
  };
  // 编辑数据
  const editTechnology = async () => {
    const res = await Api.editTechnology(inputTech);
    if (res.status === 200) {
      message.success("编辑成功");
      setTechnologyList(
        technologyList.map((itemT) => {
          if (itemT.id === inputTech.id) {
            itemT.technologyName = inputTech.technologyName;
          }
          return itemT;
        })
      );
    }
  };
  // 删除数据
  const deleteTechnology = async (id: number) => {
    const res = await Api.deleteTechnology(id);
    if (res.status === 200) {
      message.success("删除成功");
      setTechnologyList(technologyList.filter((x) => x.id !== id));
    }
  };
  const { confirm } = Modal;
  // 删除按钮
  const deleteBtn = async (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    id: number
  ) => {
    event.stopPropagation();
    confirm({
      okText: "确认",
      cancelText: "取消",
      content: <div>确认删除？</div>,
      onOk() {
        deleteTechnology(id);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  // 列表项点击
  const listItemClick = (data: TableData) => {
    navigate(`/plugin_list/technology=${data.technologyName}/id=${data.key}`);
  };
  const handleOk = () => {
    if (isNewModal) {
      addTechnology();
    } else {
      editTechnology();
    }
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    getTechnologyList();
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
        <div className={style.input_name}>技术名称：</div>
        <Input
          value={inputTech.technologyName}
          onChange={(e) => {
            let data: ITechnology = {
              id: inputTech.id,
              technologyName: e.target.value,
            };
            setInputTech(data);
          }}
          placeholder="请输入技术名称"
        />
      </Modal>
      <div className={style.tech_tool}>
        <Button
          onClick={() => {
            setInputTech({ id: 0, technologyName: "" });
            setIsNewModal(true);
            setIsModalVisible(true);
          }}
        >
          新增
        </Button>
      </div>
      <div className={style.tech_table}>
        <Table
          onRow={(record) => {
            return {
              onClick: () => {
                listItemClick(record);
              }, // 点击行
            };
          }}
          columns={columns}
          dataSource={technologyList.map((item) => {
            let data: TableData = {
              key: item.id,
              technologyName: item.technologyName,
            };
            return data;
          })}
        />
      </div>
    </div>
  );
}

export default TechnologyList;
