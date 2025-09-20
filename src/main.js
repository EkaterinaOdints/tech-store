import "./styles/styles.scss";

const header = document.body.querySelector("[data-js-header]");

const useMobileMenu = () => {
  const menu = header.querySelector("[data-js-menu]");
  const menuButton = menu.querySelector("[data-js-menu-button]");
  const menuList = menu.querySelector("[data-js-menu-list]");

  const openMenu = () => {
    menuList.classList.add("is-active");
    document.body.classList.add("overlay");
    window.addEventListener("resize", closeMenu);
  };

  const closeMenu = () => {
    menuList.classList.remove("is-active");
    document.body.classList.remove("overlay");
    window.removeEventListener("resize", closeMenu);
  };

  menuButton.addEventListener("click", () => {
    if (menuList.classList.contains("is-active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });
};

const useMobileSearch = () => {
  const search = header.querySelector("[data-js-search]");
  const searchButton = search.querySelector("[data-js-search-button]");
  const searchInput = search.querySelector("[data-js-search-input]");

  searchButton.addEventListener("click", () => {
    searchInput.classList.toggle("is-active");
  });
};

const useMobileFilters = () => {
  const filters = document.body.querySelector("[data-js-filters]");
  const buttonOpen = filters.querySelector("[data-js-filters-open-button]");
  const buttonClose = filters.querySelector("[data-js-filters-close-button]");
  const filtersWrapper = filters.querySelector("[data-js-filters-wrapper]");

  const openFilters = () => {
    filtersWrapper.classList.add("is-opened");
    document.body.classList.add("modal-overlay");
    buttonClose.addEventListener("click", closeFilters);
    window.addEventListener("resize", closeFilters);
  };

  const closeFilters = () => {
    filtersWrapper.classList.remove("is-opened");
    document.body.classList.remove("modal-overlay");
    buttonClose.removeEventListener("click", closeFilters);
    window.removeEventListener("resize", closeFilters);
  };

  buttonOpen.addEventListener("click", () => {
    openFilters();
  });
};

const useCustomSelect = () => {
  const selectWrapperCollection = document.body.querySelectorAll("[data-js-select-wrapper]");

  selectWrapperCollection.forEach((selectWrapper) => {
    const selectHidden = selectWrapper.querySelector("[data-js-select-hidden]");
    const selectHiddenOptionArray = Array(...selectHidden.children);
    const selectVisible = selectWrapper.querySelector("[data-js-select-visible]");
    const selectVisibleList = selectVisible.querySelector("[data-js-select-visible-list]");
    const selectButton = selectVisible.querySelector("[data-js-select-button]");
    const selectId = selectHidden.id;

    const openSelect = () => {
      selectVisible.classList.add("is-opened");
      selectVisibleList.addEventListener("click", onSelectButtonClick);
    };

    const closeSelect = () => {
      selectVisible.classList.remove("is-opened");
      selectVisibleList.removeEventListener("click", onSelectButtonClick);
    };

    const onSelectButtonClick = (evt) => {
      if (evt.target === selectVisibleList) {
        return;
      }

      for (const child of selectVisibleList.children) {
        child.classList.remove("is-hidden");
      }

      const activeItem = selectHidden.querySelector("[selected]");

      activeItem?.removeAttribute("selected");
      evt.target.classList.add("is-hidden");

      selectButton.textContent = evt.target.textContent;

      const selectedHiddenOption = selectHiddenOptionArray.find((element) => evt.target.id === `${selectId}-${element.value}`);
      selectedHiddenOption?.setAttribute("selected", true);
      closeSelect();
    };

    selectButton.addEventListener("click", () => {
      if (selectVisible.classList.contains("is-opened")) {
        closeSelect();
      } else {
        openSelect();
      }
    });

    const onDocumentClick = (evt) => {
      if (evt.composedPath().includes(selectWrapper)) {
        return;
      } else {
        closeSelect();
      }
    };

    document.addEventListener("click", onDocumentClick);
  });
};

useMobileMenu();
useMobileSearch();
useMobileFilters();
useCustomSelect();
