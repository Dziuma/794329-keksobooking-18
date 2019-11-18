'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var Image = {
    width: 70,
    height: 70
  };
  var IsLoaded = {
    avatar: false,
    photo: false
  };
  var avatarChooser = document.querySelector('#avatar');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var photoChooser = document.querySelector('#images');
  var photoPreview = document.querySelector('.ad-form__photo');

  var createImg = function (width, height) {
    var img = document.createElement('img');
    img.setAttribute('src', '');
    img.setAttribute('width', width);
    img.setAttribute('height', height);
    img.setAttribute('alt', 'Фото жилья');

    return img;
  };

  var loadAvatarPreview = function (file, preview) {
    var loadedFile = file.files[0];

    if (loadedFile) {
      var loadedFileName = loadedFile.name.toLowerCase();

      var matches = FILE_TYPES.some(function (fileType) {
        return loadedFileName.endsWith(fileType);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          preview.src = reader.result;

          IsLoaded.avatar = true;
        });

        reader.readAsDataURL(loadedFile);
      }
    }
  };

  var loadPhotoPreview = function (file, preview) {
    var loadedFile = file.files[0];

    if (loadedFile) {
      var loadedFileName = loadedFile.name.toLowerCase();

      var matches = FILE_TYPES.some(function (fileType) {
        return loadedFileName.endsWith(fileType);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var photo = createImg(Image.width, Image.height);
          photo.src = reader.result;
          preview.appendChild(photo);
          IsLoaded.photo = true;
        });

        reader.readAsDataURL(loadedFile);
      }
    }
  };

  var removePreview = function () {
    if (IsLoaded.avatar) {
      avatarPreview.src = 'img/muffin-grey.svg';

      IsLoaded.avatar = false;
    }
    if (IsLoaded.photo) {
      photoPreview.querySelector('img').remove();

      IsLoaded.photo = false;
    }
  };

  avatarChooser.addEventListener('change', function () {
    loadAvatarPreview(avatarChooser, avatarPreview);
  });
  photoChooser.addEventListener('change', function () {
    loadPhotoPreview(photoChooser, photoPreview);
  });

  window.photo = {
    removePreview: removePreview
  };
})();
