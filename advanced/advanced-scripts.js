
class SidebarControls {
    // class to help in the sidebar creation process
    constructor(listElement, primaryTargets, secondaryTargets, isDynammic) {
        this.listElement = listElement;
        this.primaryTargets = primaryTargets;
        this.secondaryTargets = secondaryTargets;
        this.isDynammic = isDynammic
    }

    updateListStatic() {
        // function for updating a static list
        const primaries = [...document.querySelectorAll(this.primaryTargets)];
        const secondaries = [...document.querySelectorAll(this.secondaryTargets)];
        for (var primary of primaries) {
            let listElementPrimary = document.createElement("li");
            let primaryLink = document.createElement("a");
            primaryLink.textContent = primary.textContent;
            primaryLink.href = "#" + primary.id;
            primaryLink.classList.add("neutral-link");
            listElementPrimary.appendChild(primaryLink);
            this.listElement.appendChild(listElementPrimary);
            for (var secondary of secondaries) {
                if (this.containsSubElement(secondary, primary, primaries)) {
                    let listElementSecondary = document.createElement("li");
                    let secondaryLink = document.createElement("a");
                    secondaryLink.textContent = secondary.textContent;
                    secondaryLink.href = "#" + secondary.id;
                    secondaryLink.classList.add("neutral-link");
                    listElementSecondary.appendChild(secondaryLink);
                    listElementSecondary.classList.add("secondary-list-item");
                    this.listElement.appendChild(listElementSecondary);
                }
            }
        }
    }

    containsSubElement(subEl, el, elList) {
        //returns true if subEl is in between el and the next el in el List
        // assumes elList is nonempty, and el is a member of el list
        const elIndex = elList.indexOf(el);
        const len = elList.length;
        console.log("index, length: " + elIndex + len);
        if (elIndex + 1 == len) {
            return Boolean(el.compareDocumentPosition(subEl) & Node.DOCUMENT_POSITION_FOLLOWING);
        }
        return Boolean(el.compareDocumentPosition(subEl) & Node.DOCUMENT_POSITION_FOLLOWING) && Boolean(elList[elIndex + 1].compareDocumentPosition(subEl) & Node.DOCUMENT_POSITION_PRECEDING);
    }
}





// MAIN BLOCK: THIS CODE WILL ACTUALLY RUN

if (document.body.classList.contains("advanced-javascript-body")) {
    const leftSidebar = document.querySelector("#category-list");
    const leftSidebarControls = new SidebarControls(leftSidebar, ".course-category", ".course-subcategory", true);
    leftSidebarControls.updateListStatic();

}