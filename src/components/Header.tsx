import { Button, Input, Dropdown, Menu, Spin, Select } from "antd";
import React, { useState, ChangeEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  useGetIdentity,
  useGo,
  useList,
  useLogout,
  useTranslation,
} from "@refinedev/core";
import { SearchProps } from "antd/es/input";
import { UserOutlined } from "@ant-design/icons";
import { useTranslation as usei18nextTranslation } from "react-i18next";

interface Course {
  id: number;
  title: string;
  thumbnail?: string;
  category?: {
    name: string;
  };
}

interface Lesson {
  id: number;
  title: string;
  thumbnailUrl?: string;
  course?: {
    title: string;
  };
}

interface SearchResult {
          courses: Course[];
          lessons: Lesson[];
}

const Header = () => {
  const go = useGo();
  const { mutate: logout } = useLogout();
  const user = JSON.parse(localStorage.getItem("refine_user")!);
  const { Search } = Input;
  const [search, setSearch] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const { i18n } = usei18nextTranslation();
  const { getLocale, changeLocale } = useTranslation();
  const { translate: t } = useTranslation();
  const currentLocale = getLocale();

  useEffect(() => {
    document.dir = i18n.dir(currentLocale);
  }, [currentLocale]);

  const { data: results, isLoading } = useList({
    resource: "search",
    queryOptions: {
      enabled: !!search,
    },
    pagination: {
      mode: "off",
    },
    filters: [
      {
        field: "query",
        operator: "eq",
        value: search,
      },
    ],
  });
  const searchResults :any= results?.data 
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setDropdownVisible(true);
  };

  const handleResultClick = (type: "course" | "lesson", id: number) => {
    setDropdownVisible(false);
    setSearch("");
    if (type === "course") {
      go({ to: `/courses/${id}` });
    } else {
      go({ to: `/lessons/${id}` });
    }
  };

  const getSearchMenuItems = () => {
    if (isLoading) {
      return [
        {
          key: "loading",
          label: (
            <div className="flex justify-center p-2">
              <Spin size="small" />
            </div>
          ),
        },
      ];
    }
    if (!searchResults.courses?.length && !searchResults.lessons?.length) {
      return [
        {
          key: "no-results",
          label: <div className="p-2 text-gray-500">{t('search.noResults')}</div>,
        },
      ];
    }
    const items = [];
    if (searchResults.courses?.length) {
      items.push({
        type: "group",
        key: "courses-group",
        label: t('search.courses'),
        children: searchResults.courses.map((course: Course) => ({
          key: `course-${course.id}`,
          label: (
            <div className="flex items-center gap-2">
              {course.thumbnail && (
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-8 h-8 object-cover rounded"
                />
              )}
              <div>
                <div className="font-medium">{course.title}</div>
                <div className="text-xs text-gray-500">
                  {course.category?.name}
                </div>
              </div>
            </div>
          ),
          onClick: () => handleResultClick("course", course.id),
        })),
      });
    }
    if (searchResults.lessons?.length) {
      items.push({
        type: "group",
        key: "lessons-group",
        label: t('search.lessons'),
        children: searchResults.lessons.map((lesson: Lesson) => ({
          key: `lesson-${lesson.id}`,
          label: (
            <div className="flex items-center gap-2">
              {lesson.thumbnailUrl && (
                <img
                  src={lesson.thumbnailUrl}
                  alt={lesson.title}
                  className="w-8 h-8 object-cover rounded"
                />
              )}
              <div>
                <div className="font-medium">{lesson.title}</div>
                <div className="text-xs text-gray-500">
                  {lesson.course?.title}
                </div>
              </div>
            </div>
          ),
          onClick: () => handleResultClick("lesson", lesson.id),
        })),
      });
    }
    return items;
  };


  return (
    <header>
      <nav 
      style={{ 
        background: "linear-gradient(135deg, #1e55a9 0%, #0e3b7c 100%)",
        display:"flex",
        height:"65px",
        justifyContent:"space-around",
        alignItems:"center"
      }}>
                <div className="flex items-center gap-3">
          <div className="logo">
            <Link to="#">
              <img
                className="w-[45px] rounded-full"
                src="/logo.jpeg"
                alt="Wajihni"
              />
            </Link>
          </div>
          <ul className="flex gap-2 ">
            <li >
              <Link
              className="hover:text-[#f8f8f8] text-[20px] text-[#bbb] py-1 active:text-white"
              style={{
                borderBottom:"2px solid white"
              }}
              to="/">{t('navigation.home')}</Link>
            </li>
            <li >
              <Link
              style={{
                borderBottom:"2px solid white"
              }}
              className="hover:text-[#f8f8f8] text-[20px] text-[#bbb] py-1 active:text-white"
              to="/courses">{t('navigation.courses')}</Link>
            </li>
            <li >
              <Link
              style={{
                borderBottom:"2px solid white"
              }}
              className="hover:text-[#f8f8f8] text-[20px] text-[#bbb] py-1 active:text-white"
              to="#">{t('common.ourServices')}</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3">
          <Dropdown
            menu={{ items: getSearchMenuItems() as any }}
            open={dropdownVisible && !!search}
            onOpenChange={setDropdownVisible}
            trigger={["click"]}
          >
            <Input
              value={search}
              placeholder={t('search.placeholder')}
              allowClear
              onChange={handleSearch}
              style={{ width: 304 }}
            />
          </Dropdown>
          <Select
            defaultValue={currentLocale}
            onChange={(e: any) => {
              changeLocale(e);
              window.location.reload();
            }}
          //   className="w-[70px] p-1 rounded-lg outline-none bg-[#f5f5f5] border-solid border-[1px] border-blue3 dark:text-[#252525]"
          >
            {i18n.languages.map((lang, i) => (
              <option key={i} value={lang}>
                {lang}
              </option>
            ))}
          </Select>

          {user ? (
            <Link to={`/profile`}>
              <UserOutlined style={{ fontSize: "24px", color: "white" }} />
            </Link>
          ) : null}
          {!user ? (
            <Button onClick={() => go({ to: "/login" })}>{t('common.register')}</Button>
          ) : null}
          {user ? <Button onClick={() => logout()}>{t('common.logout')}</Button> : null}
        </div>
      </nav>
    </header>
  );
};

export default Header;
