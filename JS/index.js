let title_input = document.getElementById("title");
let text_input = document.getElementById("notes");
let text_submit = document.getElementById("submit-btn");
let text_output = document.getElementById("all-notes");

// Getting previous notes if made before
let notes = localStorage.getItem("notes");
if (notes !== null) {
    note_HTML = JSON.parse(notes);
    text_output.innerHTML = note_HTML;
}

//  To add a note
text_submit.addEventListener("click", function (e) {
    e.preventDefault();
    let text = text_input.value;
    let title = title_input.value;
    if (text) {
        let first = document.getElementById("first");
        first.innerText = "";

        out_text = document.createTextNode("");
        let text_div = document.createElement("div");
        text_div.appendChild(out_text);
        text_div.setAttribute("class", "text_div");

        text_output.insertBefore(text_div, first);
        let html = `<div id="notes-box"><div id="notes-content"><strong>${title}</strong><hr>${text}</div><button type="button" class="text-del" id="text-del"> Delete Note</button></div>`;
        text_div.innerHTML = html;
    }
    text_input.value = "";
    title_input.value = "";

    //  Saving changes locally
    let local_node = JSON.stringify(text_output.innerHTML);
    localStorage.setItem("notes", local_node);
});

//  Deleting note
text_output.addEventListener("click", function (event) {
    if (event.target.className.includes("text-del")) {
        ele = event.target.parentElement.parentElement;
        ele.remove();
    }
    if (text_output.children.length === 1) {
        text_output.innerHTML = `<p id="first">Nothing to show here. Use "Add a Note" section to add notes</p>`;
    }

    // Saving changes locally
    let local_node = JSON.stringify(text_output.innerHTML);
    localStorage.setItem("notes", local_node);
});

// Deleting All Notes and clearing local storage
let del_btn = document.getElementById("delete-btn");
del_btn.addEventListener("click", function () {
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your notes",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            swal("Poof! All of your notes have been deleted!", {
                icon: "success",
            });
            localStorage.clear();
            text_output.innerHTML = `<p id="first">Nothing to show here. Use "Add a Note" section to add notes</p>`;
        } else {
            swal("Your notes are safe!");
        }
    }
)});

// For toggle menu in mobile version
let count = 0;
let toggle = document.querySelector(".js_icon");
let toggled_elem = document.getElementById("toggled_div");
toggle.addEventListener("click", function (e) {
    count++;
    if (count % 2 !== 0) {
        toggled_elem.style.display = "none";
    } else {
        toggled_elem.style.display = "block";
        count = 0;
    }
});

//  For searching notes
let search_text = document.getElementById("search_notes");
search_text.addEventListener("input", function (e) {
    if (search_text.value !== "") {
        let text_div = document.getElementsByClassName("text_div");
        let check_rem_notes = 0;

        Object.keys(text_div).forEach(function (key) {
            let txt = text_div[key].innerText.toLowerCase();
            txt = txt.replace("delete note", "");
            if (txt.includes(search_text.value.toLowerCase())) {
                text_div[key].style.display = "flex";
                check_rem_notes--;
            } else {
                text_div[key].style.display = "none";
                check_rem_notes++;
                if (check_rem_notes === text_div.length) {
                    document.getElementById(
                        "first"
                    ).innerText = `Nothing to show here. Use "Add a Note" section to add notes`;
                } else {
                    document.getElementById("first").innerText = ``;
                }
            }
        });
    } else {
        document.getElementById("first").innerText = ``;
        let text_div = document.getElementsByClassName("text_div");
        Object.keys(text_div).forEach(function (key) {
            text_div[key].style.display = "flex";
        });
    }
});
