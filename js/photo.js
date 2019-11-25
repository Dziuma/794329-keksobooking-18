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
  var photoContainer = document.querySelector('.ad-form__photo-container');

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

  var loadPhotoPreview = function (images, preview) {
    if (images.files.length === 1) {
      var loadedFile = images.files[0];
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
    } else if (images.files.length > 1) {
      var photos = Array.from(images.files);

      photoPreview.remove();
      photos.forEach(function (photo) {
        var photoName = photo.name.toLowerCase();

        var matche = FILE_TYPES.some(function (fileType) {
          return photoName.endsWith(fileType);
        });

        if (matche) {
          var formPhoto = document.createElement('div');
          formPhoto.classList.add('ad-form__photo');
          var newReader = new FileReader();

          newReader.addEventListener('load', function () {
            var img = createImg(Image.width, Image.height);

            img.src = newReader.result;
            formPhoto.appendChild(img);
            photoContainer.appendChild(formPhoto);
            IsLoaded.photo = true;
          });

          newReader.readAsDataURL(photo);
        }
      });
    }
  };

  var removePreview = function () {
    if (IsLoaded.avatar) {
      avatarPreview.src = 'img/muffin-grey.svg';

      IsLoaded.avatar = false;
    }
    if (IsLoaded.photo) {
      var photos = document.querySelectorAll('.ad-form__photo');
      var photosArr = Array.from(photos);

      photosArr.shift();

      photosArr.forEach(function (photo) {
        photo.remove();
      });
      photoContainer.querySelector('.ad-form__photo').querySelector('img').remove();

      IsLoaded.photo = false;
    }
  };

  var avatarChooserChangeHandler = function () {
    loadAvatarPreview(avatarChooser, avatarPreview);
    avatarChooser.removeEventListener('change', avatarChooserChangeHandler);
  };

  var photoChooserChangeHandler = function () {
    loadPhotoPreview(photoChooser, photoPreview);
    photoChooser.removeEventListener('change', photoChooserChangeHandler);
  };

  avatarChooser.addEventListener('change', avatarChooserChangeHandler);
  photoChooser.addEventListener('change', photoChooserChangeHandler);

  window.photo = {
    removePreview: removePreview
  };
})();
